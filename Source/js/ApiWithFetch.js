const tmblCari   = document.getElementById('search-button');
const cariInput  = document.getElementById('search-input');
const wadahMovie = document.getElementById('movie-list');
const tmblDetail = document.querySelectorAll('.see-detail');
const wadahDetail= document.querySelector('.modal-body');

//untuk tombol Cari
tmblCari.addEventListener('click',function(){
    fetch(`https://www.omdbapi.com?apikey=da2a395b&s=${cariInput.value}`)
    .then(response => response.json())//masih bentuk promise perlu di then lagi
    .then(response => {
        movie = response.Search;
        let nambahText = '';
        movie.forEach(m => {
            nambahText += isiMovie(m);
        });

        wadahMovie.innerHTML = nambahText;
        

        const details = document.querySelectorAll('.see-detail');
        details.forEach(function(detail){
            detail.addEventListener('click',function(){
                fetch(`https://www.omdbapi.com?apikey=da2a395b&i=${this.dataset.id}`)
                .then(response => response.json())
                .then(response => {
                    let nambahText = isiDetail(response);
                    wadahDetail.innerHTML = nambahText;
                });
            });
        });
        
        
    });

    cariInput.value = '';
});




//isiMovie
function isiMovie(data){
return `
    <div class="col mb-4">
        <div class="card h-100">
            <img src="`+ data.Poster+`" class="card-img-top" alt="`+ data.Title+`">
            <div class="card-body">
                <h5 class="card-title">`+ data.Title +`</h5>
                <p class="card-text">`+ data.Year +`</p>
            </div>
            <div class="card-footer">
                <h5 class="card-title">
                    <a class="btn btn-outline-primary float-right see-detail" href="#" data-id=`+ data.imdbID +` data-toggle="modal" data-target="#exampleModal">Detail</a>
                </h5>
            </div>
        </div>
    </div>
`;
}


//isiDetail
function isiDetail(movie){
return `
    <div class ="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <img src="`+ movie.Poster +`" class="img-fluid">
            </div>
            <div class="col-md-8">
                <ul class="list-group">
                    <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                    <li class="list-group-item">Released    :`+movie.Released+`</li>
                    <li class="list-group-item">Genre   :`+movie.Genre+`</li>
                    <li class="list-group-item">Director   :`+movie.Director+`</li>
                    <li class="list-group-item">Actors   :`+movie.Actors+`</li>
                </ul>
            </div>
        </div>
    </div>
`;
}