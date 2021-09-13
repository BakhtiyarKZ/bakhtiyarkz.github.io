
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
      promises.push(fetch(nft.token_uri, { mode: 'no-cors'})
            .then(res => res.json())
            .then(res => JSON.parse(res.result))
            .then(res => { nft.metadata = res} )
            .then( () => { return nft; } )
                   );

   
   
   }
         return Promise.all(promises);

}

async function getNFTs() {
    let NFTs = await Moralis.Web3API.account.getNFTs();
    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
         console.log(NFTWithMetadata);
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

