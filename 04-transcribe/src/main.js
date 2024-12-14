async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    console.error("Failed to copy: ", err);
    /* Rejected - text failed to copy to the clipboard */
  }
}

let textArea;
let button;
let select;

let tablet = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "ie",
  ё: "io",
  ж: "zh",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "'",
  ы: "y",
  ь: "'",
  э: "e",
  ю: "iu",
  я: "ia",
};

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function onClick(event) {
  let input = textArea.value.split("");
  let output = "";

  for (let c of input) {
    if (!isLetter(c) || tablet[c.toLowerCase()] == undefined) {
      output += c;
      continue;
    }

    let char;
    if (c == c.toUpperCase()) {
      char = tablet[c.toLowerCase()].toUpperCase();
    } else {
      char = tablet[c];
    }
    if (char.length == 2 && char.charAt(0) == "i") {
      char = char.replace("i", select.value);
    }
    output += char;
  }

  textArea.value = output;
  copyContent(output);
}

window.onload = () => {
  textArea = document.getElementById("input_text");
  select = document.getElementById("select");
  button = document.getElementById("button");
  button.onclick = onClick;
};
