const money=n=>"PKR "+n.toLocaleString();
function cart(){return JSON.parse(localStorage.getItem("nysaCart")||"[]")}
function saveCart(c){localStorage.setItem("nysaCart",JSON.stringify(c));updateCount()}
function updateCount(){let n=cart().reduce((a,x)=>a+x.qty,0);document.querySelectorAll("#cartCount").forEach(e=>e.textContent=n)}
function card(p){return `<article class="card"><a href="product.html?id=${p.id}"><div class="photo"><span>${p.new?"New":""}</span><img class="product-real-image" src="${p.image}" alt="${p.name}"></div></a><div class="card-info"><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><p>${p.desc}</p><strong>${money(p.price)}</strong><button onclick="addToCart(${p.id})">Add to bag</button></div></article>`}
function renderHome(){document.getElementById("newProducts").innerHTML=PRODUCTS.filter(p=>p.new).slice(0,4).map(card).join("");document.getElementById("bestProducts").innerHTML=PRODUCTS.slice(0,4).map(card).join("");updateCount()}
function renderShop(){let q=(document.getElementById("search")?.value||"").toLowerCase(),cat=new URLSearchParams(location.search).get("cat"),a=PRODUCTS.filter(p=>(!q||`${p.name} ${p.desc}`.toLowerCase().includes(q))&&(!cat||cat==="new"&&p.new||p.cat===cat||cat==="sale"&&p.price<15000));let s=document.getElementById("sort")?.value;if(s==="low")a.sort((x,y)=>x.price-y.price);if(s==="high")a.sort((x,y)=>y.price-x.price);document.getElementById("shopProducts").innerHTML=a.map(card).join("")||"<p>No products found.</p>";updateCount()}
function addToCart(id){let c=cart(),x=c.find(i=>i.id===id);x?x.qty++:c.push({id,qty:1});saveCart(c);alert("Added to bag")}
function renderProduct(){let id=+new URLSearchParams(location.search).get("id")||1,p=PRODUCTS.find(x=>x.id===id)||PRODUCTS[0];document.getElementById("productPage").innerHTML=`<div class="product-image"><img class="product-real-image" src="${p.image}" alt="${p.name}"></div><div class="product-info"><p class="eyebrow">${p.cat}</p><h1>${p.name}</h1><p>${p.desc}</p><h2>${money(p.price)}</h2><p>Color: ${p.color}</p><select><option>Select size</option><option>Small</option><option>Medium</option><option>Large</option><option>XL</option></select><button class="btn dark" onclick="addToCart(${p.id})">Add to bag</button></div>`;updateCount()}
function renderCart(){let c=cart(),box=document.getElementById("cartItems");if(!c.length){box.innerHTML="<p>Your bag is empty.</p>";document.getElementById("cartSummary").innerHTML='<a class="btn dark" href="shop.html">Continue shopping</a>';return}let total=0;box.innerHTML=c.map(i=>{let p=PRODUCTS.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cart-row"><img class="cart-real-image" src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${money(p.price)} × ${i.qty}</p><button onclick="removeItem(${p.id})">Remove</button></div></div>`}).join("");document.getElementById("cartSummary").innerHTML=`<h2>Total: ${money(total)}</h2><a class="btn dark" href="checkout.html">Checkout</a>`;updateCount()}
function removeItem(id){saveCart(cart().filter(x=>x.id!==id));renderCart()}
function renderWishlist(){let ids=JSON.parse(localStorage.getItem("nysaWish")||"[]");document.getElementById("wishProducts").innerHTML=(ids.length?PRODUCTS.filter(p=>ids.includes(p.id)):PRODUCTS.slice(0,2)).map(card).join("")}
function placeOrder(e){e.preventDefault();localStorage.removeItem("nysaCart");alert("Thank you! Your order has been received.");location.href="index.html"}
function subscribe(e){e.preventDefault();alert("Thank you for joining the NYSA world.");e.target.reset()}
if(document.getElementById("newProducts"))renderHome();updateCount();


document.addEventListener("DOMContentLoaded", function() {
  var preloader = document.getElementById("nysa-preloader");
  var progress = document.getElementById("loader-progress");
  var counter = document.getElementById("loader-counter");
  
  if (preloader && progress && counter) {
    var count = 0;
    var interval = setInterval(function() {
      count += 2;
      if (count > 100) count = 100;
      
      progress.style.width = count + "%";
      counter.innerText = count + "%";
      
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(function() {
          preloader.classList.add("hidden");
        }, 300);
      }
    }, 30);
  }
});