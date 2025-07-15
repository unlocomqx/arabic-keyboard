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
  car = car.replace(/'/g, "\'");
  car = car.replace(/a/g, "ا");
  car = car.replace(/b/g, "ب");
  car = car.replace(/p/g, "پ");
  car = car.replace(/t/g, "ت");
  car = car.replace(/F/g, "ث");
  car = car.replace(/j/g, "ج");
  car = car.replace(/H/g, "ح");
  car = car.replace(/x/g, "خ");
  car = car.replace(/d/g, "د");
  car = car.replace(/²/g, "ذ");
  car = car.replace(/v/g, "ذ");
  car = car.replace(/r/g, "ر");
  car = car.replace(/z/g, "ز");
  car = car.replace(/s/g, "س");
  car = car.replace(/"/g, "ش");
  car = car.replace(/e/g, "أ");
  car = car.replace(/S/g, "ص");
  car = car.replace(/D/g, "ض");
  car = car.replace(/T/g, "ط");
  car = car.replace(/Z/g, "ظ");
  car = car.replace(/g/g, "ع");
  car = car.replace(/G/g, "غ");
  car = car.replace(/f/g, "ف");
  car = car.replace(/q/g, "ق");
  car = car.replace(/k/g, "ك");
  car = car.replace(/l/g, "ل");
  car = car.replace(/m/g, "م");
  car = car.replace(/n/g, "ن");
  car = car.replace(/h/g, "ه");
  car = car.replace(/Q/g, "ة");
  car = car.replace(/w/g, "و");
  car = car.replace(/y/g, "ي");
  car = car.replace(/i/g, "إ");
  car = car.replace(/-/g, "ء");
  car = car.replace(/o/g, "ؤ");
  car = car.replace(/u/g, "ئ");
  car = car.replace(/I/g, "إ");
  car = car.replace(/Y/g, "ى");
  car = car.replace(/A/g, "آ");
  car = car.replace(/_/g, "ـ");
  car = car.replace(/\?/g, "؟");
  car = car.replace(/\;/g, "؛");
  car = car.replace(/\,/g, "،");
  return (car)
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
