
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


function fetchNFTMetadata(NFTs) {
   let promises = [];
   for(let i=0; i<NFTs.length; i++){
      let nft = NFTs[i];
      let id = nft.token_id; 
      promises.push(fetch("https://appsnabsfj7l.moralisweb3.com:2053/server/functions/getNFT?_ApplicationId=oJL7dXOx2y5Zl3CnHh1he21RCg1yUXLYmRVqMUtS&nftId="+id)
            .then(res => res.json())
            .then(res => JSON.parse(res.result))
            .then(res => { nft.metadata = res} )
            .then( () => { return nft; } )
                   );
   
   }
         return Promise.all(promises);

}

function renderInventory(NFTs) {
 const parent = document.getElementById("nfts");
         for(let i=0; i<NFTs.length; i++){
            const nft = NFTs[i];
         let htmlString = `
                      <div class="card">
                     <img src="${nft.metadata.image}" class="card-img-top" alt="...">
                     
                     
                     <div class="card-body">
                     <h5 class="card-title"> ${nft.metadata.name} </h5>
                     <p class="card-text">${nft.metadata.description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
                     `
         let col = document.createElement("div");
         col.className = "col col-md-3";
         col.innerHTML = htmlString;
         parent.appendChild(col);
          
         }

}




async function getNFTs() {
     const options = {chain: "mainnet", address: "0xeC2F3215698FCf4e9A5a40439C700fbD1D43313E"};
    let NFTs = await Moralis.Web3API.account.getNFTs(options);
    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
    renderInventory(NFTWithMetadata);
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

