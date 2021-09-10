
Moralis.initialize("oJL7dXOx2y5Zl3CnHh1he21RCg1yUXLYmRVqMUtS");
Moralis.serverURL = 'https://appsnabsfj7l.moralisweb3.com:2053/server';



login = async () => { 
         await Moralis.authenticate().then( async function (user) {
         user.set("name", document.getElementById('user-username').value);
         user.set("email", document.getElementById('user-email').value);
         await user.save();
         window.location.href = "dashboard.html";
    })

}


logout = async () => {
    await Moralis.User.logOut();
    window.location.href = "index.html";
}



getNFTs = async () => {
    let nftses = await Moralis.Web3API.account.getNFTs();
         console.log(nftses);
         let nfts = document.querySelector('#nfts');
         
         if(nftses.result.length > 0){
             nftses.result.forEach( n => {
                let metadata = JSON.parse(n.metadata);
                let content = `
                      <div class="card col-md-3">
        
                     <video src="${ if(metadata.animation_url!= null) {metadata.animation_url}}" autoplay poster="logo.png"></video>
                     
                     <div class="card-body">
                     <h5 class="card-title"> ${metadata.name} </h5>
                     <p class="card-text">${metadata.description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
                     `
                    nfts.innerHTML += content;
                      
             }
             
             );
         }
}

if(document.querySelector('#btn-nfts') != null)
{
    document.querySelector('#btn-nfts').onclick = getNFTs;
}

if(document.querySelector('#btn-login') != null)
{
    document.querySelector('#btn-login').onclick = login;
}

if(document.querySelector('#btn-logout') != null)
{
    document.querySelector('#btn-logout').onclick = logout;
}

