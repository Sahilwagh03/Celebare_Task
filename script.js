const uploadBox = document.querySelector('.upload-box'),
    previewImg = uploadBox.querySelector('img'),
    fileInput = uploadBox.querySelector('input')
widthInput = document.querySelector('.width input')
heightInput = document.querySelector('.height input')
const Cropbtn = document.getElementById('Cropbtn')
const SelectedImg = document.getElementById('image_crop')


const loadfile = (e) => {
    const file = e.target.files[0] //getting the first user selected file
    if (!file) return;//return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth //naturalWidth return the original width
        heightInput.value = previewImg.naturalHeight//naturalHeight return the original height
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
        document.querySelector('.wrapper').classList.add('active')
    })

}
Cropbtn.addEventListener('click', () => {
    const previewImgUrl = previewImg.src
    SelectedImg.src = previewImgUrl
    const popupButton = document.getElementById('popupButton');
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'block';

    const cropper = new Cropper(SelectedImg, {
        aspectRatio: 0,
        viewMode: 0,
    })
    const Donebtn = document.getElementById('Donebtn')
    Donebtn.addEventListener('click', () => {
        previewImg.src = cropper.getCroppedCanvas().toDataURL('image/png')
        popupContainer.style.display = 'none';
    })

})

fileInput.addEventListener("change", loadfile)
uploadBox.addEventListener('click', () => fileInput.click())





