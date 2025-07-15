//beoglcbgemddgmmnkfkjhpfpggaphhfl

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.doit == "active") {
      ArKbUnLo.On = true;
    } else {
      ArKbUnLo.On = false;
    }
  }
);


function $id(id) {
  return document.getElementById(id);
}

var ArKbUnLo = {

  On: false,

  setSelectionRange: function (input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  },

  setCaretToPos: function (input, pos) {
    ArKbUnLo.setSelectionRange(input, pos, pos);
  },

  trans: function (tname, elm, chr, chg) {
    if (tname == 'div') {
      pos = getCaretPosition(elm);
    } else {
      pos = ArKbUnLo.getCaretPos(elm);
    }

    if (chg) {
      chr = ArKbUnLo.changeit(chr);
    }
    ArKbUnLo.insert(tname, chr, elm);
    ArKbUnLo.setCaretToPos(elm, pos);
  },

  getCaretPos: function (el) {
    var rng, ii = -1;
    if (typeof el.selectionStart == "number") {
      caretPos = el.selectionStart;
    } else if (document.selection && el.createTextRange) {
      rng = document.selection.createRange();
      rng.collapse(true);
      rng.moveStart("character", -el.value.length);
      caretPos = rng.text.length;
    }
    return caretPos;
  },

  insert: function (tname, chr, elm) {
    txt = elm;
    if (tname == 'div') {
      var caretPos = getCaretPosition(elm);
      var activeElement = getActiveElement(elm);
      if (activeElement) {
        var content = activeElement.textContent;
        chr = content[ caretPos - 1 ];
        chr = ArKbUnLo.changeit(chr);
        if (elm.id == "txt") {
          return;
        }
        if (ArKbUnLo.On && (typeof chr) != "undefined") {
          content = content.substring(0, caretPos - 1) + chr + content.substring(caretPos);
          activeElement.textContent = content;
          console.log(content);
        }
      }
    } else {
      var caretPos = ArKbUnLo.getCaretPos(elm);
      chr = txt.value[ caretPos - 1 ];
      chr = ArKbUnLo.changeit(chr);
      if (elm.id == "txt") {
        return;
      }
      if (ArKbUnLo.On && (typeof chr) != "undefined") {
        txt.value = txt.value.substring(0, caretPos - 1) + chr + txt.value.substring(caretPos);
      }
    }
  },

  changeit: function (car) {
    if (!car) {
      return car;
    }
    car = car.replace(/’/g, "\'");
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
    car = car.replace(/v/g, "ڤ");
    car = car.replace(/Y/g, "ى");
    car = car.replace(/A/g, "آ");
    car = car.replace(/_/g, "ـ");
    car = car.replace(/\?/g, "؟");
    car = car.replace(/\;/g, "؛");
    car = car.replace(/\,/g, "،");
    return (car);

  }
};

function keyup(e) {

  if (e.shiftKey && e.altKey) {
    if (String.fromCharCode(e.keyCode) == "A") {
      chrome.runtime.sendMessage({mission: "setIco"});
    }
    return;
  }

  if (!ArKbUnLo.On) {
    return;
  }

  elm = e.target;
  tname = elm.tagName.toLowerCase();

  /*if (tname != "input" &&
   tname != "textarea" &&
   tname != "searchbar" &&
   tname != "textbox" &&
   tname != "html") {
   return;
   }*/

  if (e.keyCode == 190 && !e.shiftKey) {
    ArKbUnLo.trans(tname, elm, '؛', false);
  }
  if (e.keyCode == 188 && !e.shiftKey) {
    ArKbUnLo.trans(tname, elm, '،', false);
  }
  if (e.keyCode == 188 && e.shiftKey) {
    ArKbUnLo.trans(tname, elm, '؟', false);
  }
  if (e.keyCode == 54 && !e.shiftKey) {
    ArKbUnLo.trans(tname, elm, 'ء', false);
  }
  if (e.keyCode == 222) {
    ArKbUnLo.trans(tname, elm, 'ذ', false);
  }
  if (e.keyCode == 51 && !e.shiftKey) {
    ArKbUnLo.trans(tname, elm, 'ش', false);
  }

  chr = String.fromCharCode(e.keyCode);
  if (!e.shiftKey) {
    chr = chr.toLowerCase();
  }
  ArKbUnLo.trans(tname, elm, chr, true);
}

window.addEventListener('keyup', keyup, false);

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  sel = window.getSelection();
  if (sel.rangeCount) {
    range = sel.getRangeAt(0);
    caretPos = range.endOffset;
  }
  return caretPos;
}

function getActiveElement(editableDiv) {
  var caretPos = 0,
    sel, range;
  sel = window.getSelection();
  if (sel.rangeCount) {
    range = sel.getRangeAt(0);
    return range.commonAncestorContainer;
  }
  return false;
}
