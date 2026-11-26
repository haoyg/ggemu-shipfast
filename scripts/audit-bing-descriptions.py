"""Read a Bing URL export and audit server-rendered search metadata."""
import argparse
import csv
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path


class MetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.descriptions = []
        self.canonical = None
        self.robots = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta' and attrs.get('name') == 'description':
            self.descriptions.append(attrs.get('content', ''))
        if tag == 'meta' and attrs.get('name') == 'robots':
            self.robots = attrs.get('content')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')


def audit(url):
    result = subprocess.run(
        ['curl', '-sS', '-L', '--max-time', '45', url,
         '-w', '\n%{http_code}\t%{url_effective}'],
        capture_output=True, encoding='utf-8', errors='replace',
    )
    html, _, response = result.stdout.rpartition('\n')
    if '\t' not in response:
        return {'url': url, 'error': result.stderr.strip() or 'Missing HTTP response'}
    status, final_url = response.split('\t', 1)
    parser = MetadataParser()
    parser.feed(html)
    description = parser.descriptions[-1] if parser.descriptions else ''
    record = dict(url=url, status=int(status), finalUrl=final_url,
                  description=description, length=len(description),
                  descriptionCount=len(parser.descriptions),
                  canonical=parser.canonical, robots=parser.robots)
    if result.returncode:
        record['error'] = result.stderr.strip()
    return record


if __name__ == '__main__':
    cli = argparse.ArgumentParser()
    cli.add_argument('csv')
    cli.add_argument('output')
    args = cli.parse_args()
    with open(args.csv, encoding='utf-8-sig', newline='') as source:
        urls = [row['URL'] for row in csv.DictReader(source)]
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(audit, urls))
    Path(args.output).write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
    for row in results:
        print(row.get('status', 'ERR'), row.get('length', '-'), row['url'])
