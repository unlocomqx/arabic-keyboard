function $id(id) {
  return document.getElementById(id);
}

function getCaretPos(el) {
  var rng, caretPos = -1;
  if (typeof el.selectionStart == "number") {
    caretPos = el.selectionStart;
  } else if (document.selection && el.createTextRange) {
    rng = document.selection.createRange();
    rng.collapse(true);
    rng.moveStart("character", -el.value.length);
    caretPos = rng.text.length;
  }
  return caretPos;
}

function insert(chr) {
  txt = $id('txt')
  caretPos = getCaretPos($id('txt'))
  chr = txt.value[caretPos - 1]
  chr = changeit(chr)
  if ($id('arab').checked) {
    txt.value = txt.value.substring(0, caretPos - 1) + chr + txt.value.substring(caretPos)
    chrome.runtime.sendMessage({mission: "setText", Text: txt.value});
  }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}

function trans(chr, chg) {
  pos = getCaretPos($id('txt'))
  if (chg) chr = changeit(chr)
  insert(chr)
  setCaretToPos($id('txt'), pos)
}

function changeit(car) {
  if (!car) return '';

  const charMap = {
    "'": "\'",
    "a": "ا",
    "b": "ب",
    "p": "پ",
    "t": "ت",
    "F": "ث",
    "j": "ج",
    "H": "ح",
    "x": "خ",
    "d": "د",
    "²": "ذ",
    "r": "ر",
    "z": "ز",
    "s": "س",
    '"': "ش",
    "e": "أ",
    "S": "ص",
    "D": "ض",
    "T": "ط",
    "Z": "ظ",
    "g": "ع",
    "G": "غ",
    "f": "ف",
    "q": "ق",
    "k": "ك",
    "l": "ل",
    "m": "م",
    "n": "ن",
    "h": "ه",
    "Q": "ة",
    "w": "و",
    "y": "ي",
    "i": "إ",
    "£": "ء",
    "o": "ؤ",
    "u": "ئ",
    "I": "إ",
    "v": "ڤ",
    "Y": "ى",
    "A": "آ",
    "_": "ـ",
    "?": "؟",
    ";": "؛",
    ",": "،",
    "3": "ّ",
    "_":"ِ",
    "-":"َ",
    "0":"َ",
    "*":"ڨ",
  };

  return charMap[car] || car;
}

chrome.runtime.sendMessage({mission: "getText"},
  function (response) {
    $id('txt').value = response.Text;
  }
);
if ($id('txt')) {
  $id('txt').addEventListener('keyup', function (e) {
    if (($id('arab') && !$id('arab').checked) || e.ctrlKey || e.altKey) {
      return;
    }
    //alert(e.keyCode)
    if (e.keyCode == 27) {
      $id("divfortxt").parentNode.removeChild($id("divfortxt"));
    }
    if (e.keyCode == 190 && !e.shiftKey) {
      trans('؛', false);
    }
    if (e.keyCode == 188 && !e.shiftKey) {
      trans('،', false);
    }
    if (e.keyCode == 188 && e.shiftKey) {
      trans('؟', false);
    }
    if (e.keyCode == 54 && !e.shiftKey) {
      trans('ء', false);
    }
    if (e.keyCode == 222) {
      trans('ذ', false);
    }
    if (e.keyCode == 51 && !e.shiftKey) {
      trans('ش', false);
    }

    chr = String.fromCharCode(e.keyCode);
    if (!e.shiftKey) {
      chr = chr.toLowerCase();
    }
    trans(chr, true);
  }, false);
}
window.addEventListener('keydown', function (e) {
  //the Hotkey
  if (e.altKey && e.shiftKey) {
    //the CheckBox
    if ($id('arab') && !document.getElementById('arab').checked) {
      $id('arab').checked = true;
    } else {
      document.getElementById('arab').checked = false;
    }

  }
}, false);

window.addEventListener("load", function () {
  document.getElementById("txt").focus();
});
