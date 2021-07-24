export const imageService={
    uploadImg
}

async function uploadImg(ev) {
    const CLOUD_NAME = "dygtul5wx"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'dwykoqry');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data);
        return data

    } catch (err) {
        console.log(err);
    }
}
