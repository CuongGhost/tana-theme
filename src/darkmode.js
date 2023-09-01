/**
     * Fork of Preline UI is Open Source by Html Stream
     * https://github.com/htmlstreamofficial/preline
     *
     * Copyright (c) 2023 Html Stream, MIT License, https://github.com/htmlstreamofficial/preline/blob/main/LICENSE
     */

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    }
}

const HSThemeAppearance = {
    // Selecting necessary elements from the DOM
    htmlEl: document.querySelector('html'),
    $clickableThemes: document.querySelectorAll('[data-hs-theme-click-value]'),
    $switchableThemes: document.querySelectorAll('[data-hs-theme-switch]'),

    // Initialize the theme
    init() {
        const defaultTheme = 'default'
        let theme = localStorage.getItem('hs_theme') || defaultTheme

        if (this.htmlEl.classList.contains('dark')) return
        this.setAppearance(theme)
    },

    // Reset styles on load
    _resetStylesOnLoad() {
        const $resetStyles = document.createElement('style')
        $resetStyles.innerText = `*{transition: unset !important;}`
        $resetStyles.setAttribute('data-hs-appearance-onload-styles', '')
        document.head.appendChild($resetStyles)
        return $resetStyles
    },

    // Set the appearance of the theme
    setAppearance(theme, saveInStore = true, dispatchEvent = true) {
        const $resetStylesEl = this._resetStylesOnLoad()

        if (saveInStore) {
            localStorage.setItem('hs_theme', theme)
        }

        if (theme === 'auto') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
        }

        this.htmlEl.className = this.getOriginalAppearance()

        setTimeout(() => {
            $resetStylesEl.remove()
        })

        if (dispatchEvent) {
            window.dispatchEvent(new CustomEvent('on-hs-appearance-change', {detail: theme}))
        }
    },

    // Get the current appearance of the theme
    getAppearance() {
        let theme = this.getOriginalAppearance()
        if (theme === 'auto') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
        }
        return theme
    },

    // Get the original appearance of the theme
    getOriginalAppearance() {
        const defaultTheme = 'default'
        return localStorage.getItem('hs_theme') || defaultTheme
    }
}

// Initialize the theme
HSThemeAppearance.init()

// Listen for changes in the preferred color scheme and update the theme accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', debounce(e => {
    if (HSThemeAppearance.getOriginalAppearance() === 'auto') {
        HSThemeAppearance.setAppearance('auto', false)
    }
}, 250))

// On window load, attach event listeners to theme elements
window.addEventListener('load', () => {
    // For each clickable theme, update the appearance on click
    HSThemeAppearance.$clickableThemes.forEach($item => {
        $item.addEventListener('click', () => HSThemeAppearance.setAppearance($item.getAttribute('data-hs-theme-click-value'), true, $item))
    })

    // For each switchable theme, update the appearance on change
    HSThemeAppearance.$switchableThemes.forEach($item => {
        $item.addEventListener('change', (e) => {
            HSThemeAppearance.setAppearance(e.target.checked ? 'dark' : 'default')
        })

        $item.checked = HSThemeAppearance.getAppearance() === 'dark'
    })

    // When the theme changes, update the checked state of switchable themes
    window.addEventListener('on-hs-appearance-change', e => {
        HSThemeAppearance.$switchableThemes.forEach($item => {
            $item.checked = e.detail === 'dark'
        })
    })
})