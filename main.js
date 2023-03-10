const join = document.querySelector(".cards");

function getCard(nam, user, users) {
  return `
    <div class="card">
        <div class="card-body">
            <h1>${nam}</h1>
            <p>${user}</p>
            <div class="btns">
              <button data-id="${users}" id="post" type="button" class="btn btn-secondary">Post</button>
              <button data-id="${users}" id="album" type="button" class="btn btn-secondary">Album</button>
              <button data-id="${users}" id="Todos" type="button" class="btn btn-secondary">Todos</button>  
            </div>
        </div>
    </div>
    `;
}
function getCard2(nam, user, users) {
  return `
    <div class="card">
        <div class="card-body">
            <h1>${nam}</h1>
            <p>${user}</p>
            <p>${users}</p>
        </div>
    </div>
    `;
}

async function getID(a, title, r) {
  a.innerHTML = "...loading";
  let res = await fetch(`https://jsonplaceholder.typicode.com/${title}`);
  let data = await res.json();
  let res2 = await fetch(`https://jsonplaceholder.typicode.com/users`);
  let data2 = await res2.json();
  let id = 0;
  for (el of data2) {
    if (el.username == r) {
      id = el.id;
    }
  }
  a.innerHTML = "";
  for (el of data) {
    if (el.userId == id) {
      a.innerHTML += getCard2(el.userId, el.body, el.title);
    }
  }
}

async function getID2(a, r) {
  a.innerHTML = "...loading";
  let res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  let data = await res.json();
  let res2 = await fetch(`https://jsonplaceholder.typicode.com/users`);
  let data2 = await res2.json();
  let id = 0;
  for (el of data2) {
    if (el.username == r) {
      id = el.id;
    }
  }
  a.innerHTML = "";
  for (el of data) {
    if (id == el.userId) {
      a.innerHTML += getCard2(el.userId, el.title);
    }
  }
}
async function getID3(a, r) {
  a.innerHTML = "...loading";
  let res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  let data = await res.json();
  let res2 = await fetch(`https://jsonplaceholder.typicode.com/users`);
  let data2 = await res2.json();
  let id = 0;
  for (el of data2) {
    if (el.username == r) {
      id = el.id;
    }
  }
  a.innerHTML = "";
  for (el of data) {
    if (id == el.userId) {
      console.log(el);
      a.innerHTML += getCard2(el.completed,el.userId, el.title );
    }
  }
}
async function sname(a, title) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/${title}`);
  let data = await res.json();
  for (el of data) {
    let r = getCard(el.name, el.username, el.username);
    a.innerHTML += r;
  }
}
sname(join, "users");

let btns = document.querySelector(".cards");

btns.addEventListener("click", (e) => {
  if (e.target.matches("#post")) {
    let res = e.target.getAttribute("data-id");
    getID(join, "posts", res);
  }
  if (e.target.matches("#album")) {
    let res = e.target.getAttribute("data-id");
    getID2(join, res);
  }
  if (e.target.matches("#Todos")) {
    let res = e.target.getAttribute("data-id");
    getID3(join, res);
  }
});

// post.addEventListener('click' , (e) => {
//   console.log(e);
// })

// /posts/1/comments | in post
// /albums/1/photos | in album
// /users/1/albums | in user
// /users/1/todos | in user
// /users/1/posts | in user
