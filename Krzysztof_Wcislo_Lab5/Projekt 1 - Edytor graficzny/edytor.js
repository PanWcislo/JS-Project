let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

let imageData

let img = new Image()
img.src = 'photos/krakow.jpeg'

img.addEventListener('load', (e)=> {
    ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
})

let lastUsedFilter = ''

document.querySelector('#brightness').addEventListener('input', (e)=>{lastFilterChange('brightness'); changeBrightness(e.target.value);})
document.querySelector('#contrast').addEventListener('input', (e)=>{lastFilterChange('contrast'); changeContrast(e.target.value);})
document.querySelector('#saturation').addEventListener('input', (e)=>{lastFilterChange('saturation'); changeSaturation(e.target.value);})

function changeContrast(contrast) { 
    contrast *= -2.55;
    let factor = (255 - contrast) / (255 + contrast);

    let newImageData = new ImageData(canvas.width, canvas.height)
    for (let i = 0; i<newImageData.data.length; i+=4)
    {
        newImageData.data[i] = imageData.data[i] * factor + contrast
        newImageData.data[i+1] = imageData.data[i+1] * factor + contrast
        newImageData.data[i+2]= imageData.data[i+2] * factor + contrast
        newImageData.data[i+3]= imageData.data[i+3]
    }

    ctx.putImageData(newImageData, 0, 0)
}

function changeBrightness(brightness) { 
    
    brightness = (brightness/255)*500

    let newImageData = new ImageData(canvas.width, canvas.height)
    for (let i = 0; i<newImageData.data.length; i+=4)
    {
        newImageData.data[i] = imageData.data[i] + brightness
        newImageData.data[i+1] = imageData.data[i+1] + brightness
        newImageData.data[i+2]= imageData.data[i+2] + brightness
        newImageData.data[i+3]= imageData.data[i+3]
    }

    ctx.putImageData(newImageData, 0, 0)
}

function changeSaturation(saturation) { 

    saturation = (saturation/255)*200

    let newImageData = new ImageData(canvas.width, canvas.height)
    for (let i = 0; i<newImageData.data.length; i+=4)
    {
        if ( imageData.data[i] > imageData.data[i+1] && imageData.data[i] > imageData.data[i+2] ) {
            newImageData.data[i] = imageData.data[i] + saturation
            newImageData.data[i+1] = imageData.data[i+1]
            newImageData.data[i+2]= imageData.data[i+2]
        } else if ( imageData.data[i+1] > imageData.data[i] && imageData.data[i+1] > imageData.data[i+2] ) {
            newImageData.data[i] = imageData.data[i]
            newImageData.data[i+1] = imageData.data[i+1] + saturation
            newImageData.data[i+2]= imageData.data[i+2]
        } else if ( imageData.data[i+2] > imageData.data[i+1] && imageData.data[i+2] > imageData.data[i] ) {
            newImageData.data[i] = imageData.data[i]
            newImageData.data[i+1] = imageData.data[i+1]
            newImageData.data[i+2]= imageData.data[i+2] + saturation
        } else {
            newImageData.data[i] = imageData.data[i] + saturation
            newImageData.data[i+1] = imageData.data[i+1] + saturation
            newImageData.data[i+2]= imageData.data[i+2] + saturation
        }

        
        newImageData.data[i+3]= imageData.data[i+3]
    }

    ctx.putImageData(newImageData, 0, 0)
}

function lastFilterChange(filter)
{
    if(lastUsedFilter != filter)
    {
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        lastUsedFilter = filter
    }
}