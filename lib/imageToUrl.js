
const url = process.env.STRAPI_URL || 'http://localhost:1337'
export default function imageToUrl(path){
    const imageUrl = path.startsWith('/')?`${url}${path}`:path
    return imageUrl
}