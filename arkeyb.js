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
      "§": "ذ",
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
      "-": "ء",
      "o": "ؤ",
      "u": "ئ",
      "I": "إ",
      "v": "ذ",
      "Y": "ى",
      "A": "آ",
      "_": "ـ",
      "?": "؟",
      ";": "؛",
      ",": "،",
      "3": "ّ",
      "_":"ِ",
      "0":"َ",
      "*":"ڨ",
    };

    return charMap[car] || car;
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
