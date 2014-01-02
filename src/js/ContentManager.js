/**
 * Created by xaoyang on 12/13/13.
 */
 
function ContentManager(){
    // Method called back once all elements have been downloaded
    var onDownloadCompleted;
    // Number of elements to download;
    var NUM_ELMENTS_TO_DOWNLOAD = 6;

    // setting the callback method
    this.SetDownloadCompleted = function(callbackMethod){
      onDownloadCompleted = callbackMethod;
    };

	// garbage items
    this.imgA = new Image();
	this.imgB = new Image();
	this.imgC = new Image(); 
	this.imgD = new Image();
	this.imgE = new Image();
	this.imgF = new Image();
		
    var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function () {
        // get garbage images
        SetDownloadParameters(this.imgA, "src/img/banana.png", handleImageLoad, handleImageError)	;
        SetDownloadParameters(this.imgB, "src/img/chips.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgC, "src/img/cellphone.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgD, "src/img/shirt.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgE, "src/img/waterbottle.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgF, "src/img/plasticbag.png", handleImageLoad, handleImageError);
    }

	this.GetRandomImage = function (){
		
		var no_to_img_map = {
			0 : this.imgA,
			1 : this.imgB,
			2 : this.imgC,
			3 : this.imgD,
			4 : this.imgE,
			5 : this.imgF,
		};
		
		return no_to_img_map[Math.floor(Math.random() * 6)];
	}

    function SetDownloadParameters(imgElement, url,loadedHandler, errorHandler){
        
        imgElement.src = url;
        console.log("img source: " + imgElement.src);
        
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    // global handler
    function handleImageLoad(e){
        numImagesLoaded++;

        console.log("images load: " + numImagesLoaded);

        // If all elements have been downloaded
        if(numImagesLoaded === NUM_ELMENTS_TO_DOWNLOAD){
            console.log("all elements have been loaded");
			numImagesLoaded = 0;
			
            onDownloadCompleted();
        }
    }

    function handleImageError(e){
        console.log("Error Loading Image :" + e.target.src);
    }
    
}