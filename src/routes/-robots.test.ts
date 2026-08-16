import { describe, expect, it } from 'vitest'

import { buildRobotsTxt, getRobotsOrigin } from './robots[.]txt'

describe('robots.txt', () => {
  it('uses the secure canonical origin in production', () => {
    expect(
      getRobotsOrigin(new Request('http://pokopie.com/robots.txt')),
    ).toBe('https://pokopie.com')
    expect(
      getRobotsOrigin(new Request('http://www.pokopie.com/robots.txt')),
    ).toBe('https://pokopie.com')
  })

  it('keeps preview and local origins intact', () => {
    expect(
      getRobotsOrigin(
        new Request('https://ggemu-shipfast.workers.dev/robots.txt'),
      ),
    ).toBe('https://ggemu-shipfast.workers.dev')
    expect(
      getRobotsOrigin(new Request('http://localhost:3000/robots.txt')),
    ).toBe('http://localhost:3000')
  })

  it('renders the sitemap URL', () => {
    expect(buildRobotsTxt('https://pokopie.com')).toContain(
      'Sitemap: https://pokopie.com/sitemap.xml',
    )
  })
})
