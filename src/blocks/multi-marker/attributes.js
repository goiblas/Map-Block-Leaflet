import providers from './../../shared/providers';

const attributes = {
    markers: {
        type: 'array',
        default: []
    },
    themeId: {
        type: 'number',
        default: providers[0].id
    },
    themeUrl: {
        type: 'string',
        default: providers[0].url
    },
    themeAttribution: {
        type: 'string',
        default: providers[0].attribution
    },
    height: {
        type: 'number',
        default: 220
    },
}

export default attributes;