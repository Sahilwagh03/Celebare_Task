const uploadBox = document.querySelector('.upload-box'),
previewImg = uploadBox.querySelector('img'),
fileInput = uploadBox.querySelector('input')
widthInput = document.querySelector('.width input')
heightInput = document.querySelector('.height input')
const Cropbtn = document.getElementById('Cropbtn')
const SelectedImg = document.getElementById('image_crop')
downdloadBtn = document.querySelector('.download-btn')


const loadfile = (e) => {
    const file = e.target.files[0] 
    if (!file) return;
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth 
        heightInput.value = previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
        document.querySelector('.wrapper').classList.add('active')
    })

}



Cropbtn.addEventListener('click', () => {
    
    SelectedImg.src =previewImg.src
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'block';

    const cropper = new Cropper(SelectedImg, {
        aspectRatio: 0,
        viewMode: 0,
    })
    const Donebtn = document.getElementById('Donebtn')
    Donebtn.addEventListener('click', () => {
        previewImg.src = cropper.getCroppedCanvas().toDataURL()
        popupContainer.style.display = 'none';
    })
})


function downloadImage(url, filename) {
    var link = document.createElement('a');
    link.href = previewImg.src;
    link.download = 'images.png';
    link.click();
}
  downdloadBtn.addEventListener('click',downloadImage)
fileInput.addEventListener("change", loadfile)
uploadBox.addEventListener('click', () => fileInput.click())

window.onload = function() {

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    $("#file").change(function(e){
        img = new Image;
        img.onload = function() {
            context.drawImage(img, 0, 0);
        }
        img.src = URL.createObjectURL(e.target.files[0]);
    })

    $(".image-container img").click(function(e){

        let id = $(this).attr("id");
        $("#hidden").attr("src", "shapes/" + id + ".png");

        //clipping code
        img1 = document.getElementById("hidden");

        //resetting canvas
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //clip
        context.globalCompositeOperation = 'source-in';
        context.drawImage(img1, 0, 0);
        context.drawImage(img, 0, 0);
        context.globalCompositeOperation='source-over';
    })
}