/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                'di-title': [
                    '5rem',
                    {
                        letterSpacing: '-0.02rem',
                        fontWeight: '700'
                    }
                ],
                'di-title-mobile': [
                    '3rem',
                    {
                        fontWeight: '700',
                        letterSpacing: '-0.02rem'
                    }
                ],
                'di-paragraph': [
                    '1.5rem',
                    {
                        lineHeight: '150%',
                        letterSpacing: '-0.01rem'
                    }
                ],
                'di-desc': [
                    '1rem',
                    {
                        lineHeight: '160%',
                        letterSpacing: '-0.01rem'
                    }
                ],
                'di-sub-title': [
                    '2.5rem',
                    {
                        fontWeight: '600',
                        lineHeight: '150%',
                        letterSpacing: '-0.01rem'
                    }
                ],
                'di-slider-text': [
                    '1.5rem',
                    {
                        lineHeight: '150%'
                    }
                ],
                'di-secondary-heading': [
                    '4.5rem',
                    {
                        fontWeight: '700',
                        lineHeight: '91px'
                    }
                ],
                'di-secondary-sub-title': [
                    '2rem',
                    {
                        lineHeight: '150%'
                    }
                ],
                'di-stat-desc': [
                    '3rem',
                    {
                        fontWeight: '800',
                        lineHeight: '150%'
                    }
                ],
                'di-animate-text': [
                    '4rem',
                    {
                        fontWeight: '400',
                        lineHeight: '150%'
                    }
                ],
                'di-small-desc': [
                    '0.875rem',
                    {
                        lineHeight: '150%'
                    }
                ]
            },
            fontFamily: {
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
                noto: ['"Noto Serif"', 'serif']
            },
            colors: {
                'di-black': '#0F0F0F',
                'di-white-read': '#DDDDDD',
                'di-disabled': '#A5A7AC',
                'di-gray': '#4D4D4F',
                'di-red': '#C1121F',
                'di-black-overlay': '#1D1A1A'
            }
        }
    },
    plugins: []
}
