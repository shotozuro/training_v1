function toUTF16(codePoint) {
  var TEN_BITS = parseInt('1111111111', 2);
  function u(codeUnit) {
    return '\\u'+codeUnit.toString(16).toUpperCase();
  }

  if (codePoint <= 0xFFFF) {
    return u(codePoint);
  }
  codePoint -= 0x10000;

  // Shift right to get to most significant 10 bits
  var leadSurrogate = 0xD800 + (codePoint >> 10);

  // Mask to get least significant 10 bits
  var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);

  return u(leadSurrogate) + u(tailSurrogate);
}

function convert() {
  const emoji = document.getElementById("emoji").value
  let converted = []
  let splited = []
  for (let i = 0; i < emoji.length; i++) {
    const codePoint = emoji.codePointAt(i)
    const utf = codePoint.toString(16).toUpperCase()
    converted.push(utf)
    splited.push(codePoint)
  }
  document.getElementById("result").innerText = converted.join(", ")
  document.getElementById("listEmoji").innerText = splited.map(x => String.fromCodePoint(x)).join(", ")
}

document.getElementById("submit").addEventListener("click", convert)