import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { AnalyticsConsentControls } from './analytics-consent'
import { analyticsConsentKey } from '#/lib/analytics'

afterEach(() => {
  cleanup()
  localStorage.clear()
  const target = window as unknown as Record<string, unknown>
  for (const key of ['__POKOPIE_ANALYTICS_CHOICE__', '__POKOPIE_GOOGLE_CONSENT_INITIALIZED__', 'gtag', 'dataLayer']) delete target[key]
})

it('lets visitors reject, reopen preferences and allow analytics', () => {
  render(<AnalyticsConsentControls locale="en" />)
  expect(screen.getByRole('region', { name: 'Analytics preferences' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Reject analytics' }))
  expect(localStorage.getItem(analyticsConsentKey)).toBe('denied')
  expect(screen.queryByRole('region')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Analytics preferences' }))
  fireEvent.click(screen.getByRole('button', { name: 'Allow analytics' }))
  expect(localStorage.getItem(analyticsConsentKey)).toBe('granted')
  expect(screen.queryByRole('region')).toBeNull()
})

it('remembers a rejection and offers localized controls to change it', () => {
  localStorage.setItem(analyticsConsentKey, 'denied')
  render(<AnalyticsConsentControls locale="zh-CN" />)
  expect(screen.queryByRole('region')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '统计偏好设置' }))
  expect(screen.getByRole('button', { name: '拒绝统计' }).getAttribute('aria-pressed')).toBe('true')
  expect(screen.getByRole('link', { name: '隐私政策' }).getAttribute('href')).toBe('/zh-CN/privacy-policy')
})
