// 투두 등록하기
// 1. input의 입력값을 받아온다.
// 2. 버튼을 가져와서 클릭 이벤트를 만들어준다
// 3. 클릭하면 인풋의 값을 저장한다
// 4. 저장된 인풋값을 화면에 보여준다
// 5. 화면에 보여줄때 삭제 버튼도 함께 생성된다

const todoUrl = "http://localhost:3000/todos";

const $input = document.querySelector("input");
const $addBtn = document.querySelector(".addBtn");
const $ul = document.querySelector("ul");

// 기존 서버 데이터를 불러오기
async function getData() {
  try {
    const res = await fetch(todoUrl);
    const resData = await res.json();

    resData.forEach((item) => {
      const $li = document.createElement("li");
      const $button = document.createElement("button");
      $button.classList.add("delBtn");

      $li.innerHTML = `${item.id}. ${item.todo}`;
      $li.appendChild($button);
      $ul.appendChild($li);
      $button.innerText = "삭제";

      // 삭제 버튼 클릭 이벤트 추가
      $button.addEventListener("click", async function () {
        await del(item.id);
        $li.remove(); // UI에서 해당 항목 삭제
      });
    });
  } catch (err) {
    console.error("오류 발생:", err);
  }
}
getData();

// 투두리스트를 서버에 새롭게 추가
const addTodo = async function (todotext) {
  try {
    const response = await fetch(todoUrl);
    const todos = await response.json();

    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1; // ID 생성 로직 수정
    const req = await fetch(todoUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: newId, todo: todotext }),
    });

    const newPost = await req.json();

    const $li = document.createElement("li");
    $li.innerHTML = `${newPost.id}. ${newPost.todo}`;
    const $button = document.createElement("button");
    $button.classList.add("delBtn");
    $button.innerText = "삭제";
    $li.appendChild($button);
    $ul.appendChild($li);

    // 추가된 항목에 삭제 이벤트 리스너 추가
    $button.addEventListener("click", async function () {
      await del(newPost.id);
      $li.remove(); // UI에서 해당 항목 삭제
    });
  } catch (err) {
    console.log("오류 발생:", err);
  }
};

// 삭제 요청 함수
const del = async function (id) {
  try {
    await fetch(`${todoUrl}/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log("삭제 중 오류 발생:", err);
  }
};

// 등록하기 버튼 클릭 시 투두 추가
$addBtn.addEventListener("click", function () {
  let value = $input.value;
  if (value.trim()) {
    addTodo(value);
    $input.value = "";
  } else {
    alert("할 일을 입력해주세요.");
  }
});

const $listWrap = document.querySelector(".listWrap");
$ul.classList.add("dataTodo");

$listWrap.appendChild($ul);

// 삭제 버튼을 눌렀을 때 삭제가 되면
// 삭제된 요소 아래의 li 리스트 번호를 원래 번호에서 -1로 바꾼다
// length의 길이에서 -1을 하면 성립될 수 없으니까
// 번호만 불러와서 제어할 수 있는 html 태그를 만들어줘야된다
// 번호를 불러와서 -1을 해준다
// 그러고 html에 다시 그려준다
