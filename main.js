let noteArea = document.querySelector(".note-area");
let title = document.getElementById("title");
let noteText = document.getElementById("note-text");
let notes = document.getElementById("notes");
let note = document.getElementById("note");

const showNoteArea = () => {
  noteText.style = "display: block;";
  noteArea.classList.add("note-now");
  title.setAttribute("placeholder", "Title");
  title.style = "font-size: 20px";
};

const hideNoteArea = () => {
  noteText.style = "display: none;";
  noteArea.classList.remove("note-now");
};

const addNote = (t, n) => {
  notes.innerHTML += `  <div class="note" id="note">
                <h3 class="title-text" id="title-text">${t}</h3>
                <p class="note-blog">${n}</p>
                <i class="fa fa-trash "></i>
               </div>`;

  title.value = "";
  noteText.value = "";
};

const addNoteLocalStorage = (note) => {
  if (note.length < 0) {
    return;
  }
  let oldNote;
  if (localStorage.getItem("notes") === null) {
    oldNote = [];
  } else {
    oldNote = JSON.parse(localStorage.getItem("notes"));
  }
  oldNote.push(note);

  localStorage.setItem("notes", JSON.stringify(oldNote));
};

 const getNotesFromLocalStorage = () => {
  let oldNote;
  if (localStorage.getItem("notes") === null) {
    oldNote = [];
  } else {
    oldNote = JSON.parse(localStorage.getItem("notes"));
  }

  oldNote.forEach(note => {

    notes.innerHTML += `  <div class="note" id="note">
    <h3 class="title-text" id="title-text">${note[0]}</h3>
    <p class="note-blog">${note[1]}</p>
    <i class="fa fa-trash "></i>
   </div>`;

  }); 


 }

 const deleteFromLocalStorage = (deletedNote) => {

            
        let oldNote;
        if (localStorage.getItem("notes") === null) {
            oldNote = [];
        } else {
            oldNote = JSON.parse(localStorage.getItem("notes"));
        }
    
        oldNote.map((note, index) => {
            // console.log(note);

            if(note[0] == deletedNote.children[0].texContent.trim() && note[1] == deletedNote.children[1].texContent.trim()){

                oldNote.splice(index, 1);

                return oldNote;

            }
            
        });

        localStorage.setItem('notes', JSON.stringify(oldNote))
 }

noteArea.addEventListener("click", () => {
  showNoteArea();
});

document.addEventListener("DOMContentLoaded", () => {
  getNotesFromLocalStorage();
});

document.addEventListener("click", (event) => {
  let isClicked = noteArea.contains(event.target);

  if (!isClicked) {
    hideNoteArea();

    if (title.value.length === 0 && noteArea.value.length === 0) {
      return;
    } else {
      addNoteLocalStorage([title.value, noteText.value]);
      addNote(title.value, noteText.value);
    }
  }
});

document.addEventListener("mouseover", (event) => {
  // console.log("first")
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.add("show");
  }
});

document.addEventListener("mouseout", (event) => {
  // console.log("first mouse");
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.remove("show");
  }
});

document.addEventListener("click", (event) => {
  // console.log("first mouse");
  if (event.target.classList.contains("fa-trash")) {
    event.target.parentElement.remove();

    deleteFromLocalStorage(event.target.parentElement);
  }
});

// localstorage

// localStorage.setItem( "name" ,"maryama");

// console.log(
// localStorage.getItem("name"))
