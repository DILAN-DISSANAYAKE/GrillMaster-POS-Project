console.log("Js Loded..!");

AOS.init({ duration: 800 });

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let user = document.getElementById("username").value;
        let pass = document.getElementById("password").value;
        if (user === "DD" && pass === "1234") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid login! Incorrect UserName or Password..!");
        }
    });
}

const burgerList = document.getElementById("burgerList");
if (burgerList) {
    const burgers = [
        { name: "Cheese Burger", price: 1200, img: "burger1.jpg" },
        { name: "Chicken Burger", price: 1000, img: "burger2.jpg" },
        { name: "Double Beef", price: 1500, img: "burger3.jpg" },
        { name: "Veggie Delight", price: 900, img: "burger4.jpg" },
        { name: "BBQ Burger", price: 1400, img: "burger5.jpg" },
        { name: "Spicy Grill", price: 1300, img: "burger6.jpg" },
        { name: "Classic Beef", price: 1100, img: "burger7.jpg" },
        { name: "Fish Burger", price: 1250, img: "burger8.jpg" },
        { name: "Mushroom Melt", price: 1350, img: "burger9.jpg" },
        { name: "Bacon Burger", price: 1600, img: "burger10.jpg" },
        { name: "Smoky Jalapeno Burger", price: 1450, img: "burger11.jpg" },
        { name: "Mediterranean Veggie ", price: 950, img: "burger12.jpg" }
    ];
    burgers.forEach(burgers => {
        let div = document.createElement("div");
        div.className = "col-md-4";
        div.setAttribute("data-aos", "zoom-in");
        div.innerHTML = `
        <div class="card m-3 p-0 text-center h-100">
          <img src="assets/image/${burgers.img}" class="card-img-top" style="height:300px; object-fit:cover;" alt="${burgers.name}">
          <h4 class="mt-2 p-4 fw-bold">${burgers.name}</h4>
          <h5  style="margin-bottom:30px;">Rs. ${burgers.price}</h5>
          <button class="btn btn-gradient btn-sm addToCart" style="margin-right:15px;margin-left:15px;" data-name="${burgers.name}" data-price="${burgers.price}" data-img="${burgers.img}">Add to Cart</button>
        </div>
      `;
        burgerList.appendChild(div);
    });

    const addBtns = document.querySelectorAll(".addToCart");
    addBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            const img = btn.dataset.img;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name, price, img, customer: "DD" });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });
}

const customerOrders = document.getElementById("customerOrders");
const totalPrice = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

if (customerOrders) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let summary = {};
    cart.forEach(item => {
        if (summary[item.name]) {
            summary[item.name].qty += 1;
            summary[item.name].price += item.price;
        } else {
            summary[item.name] = { name: item.name, qty: 1, price: item.price, img: item.img };
        }
    });

    let total = 0;
    customerOrders.innerHTML = "";

    Object.values(summary).forEach((item, index) => {
        total += item.price;
        let div = document.createElement("div");
        div.className = "col-md-4";
        div.setAttribute("data-aos", "zoom-in");
        div.innerHTML = `
      <div class="card p-3 text-center">
        <img src="assets/image/${item.img}" class="card-img-top" alt="${item.name}" style="height:200px; object-fit:cover;">
        <h6 class="mt-2">${item.name}</h6>
        <p>Qty: ${item.qty}</p>
        <p>Price: Rs.${item.price}</p>
        <button class="btn btn-danger btn-sm delete-btn" data-name="${item.name}">Delete</button>
      </div>
    `;
        customerOrders.appendChild(div);
    });

    totalPrice.textContent = "Rs. " + total;

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            cart = cart.filter(i => i.name !== name);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("No items in cart!");
            return;
        }
        console.log("Checkout details:", JSON.stringify(cart));
        alert("Checkout complete! See console for details.");
        localStorage.removeItem("cart");
        location.reload();
    });
}
