import providers from './../../shared/providers';

const attributes = {
    align: {
        type: 'string'
    },
    lat: {
        type: 'number',
        default: 40.416775
    },
    lng: {
        type: 'number',
        default: -3.703790
    },
    content: {
        type: 'string'
    },
    zoom: {
        type: 'number',
        default: 15
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
    disableScrollZoom: {
        type: 'boolean',
        default: true
    }
}

export default attributes;