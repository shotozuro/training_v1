document.getElementById("submit").addEventListener("click", renderPlat)

function checkNumber (str) {
  const regBantul = /(AB)\s?[1-9][\d]{1,3}\s?[A-Z]*(B|G|J|K|T)$/g
  const regKulonProgo = /(AB)\s?[1-9][\d]{1,3}\s?[A-Z]*(C|L|P|V)$/g
  const regGunKid = /(AB)\s?[1-9][\d]{1,3}\s?[A-Z]*(D|M|W)$/g
  const regSleman = /(AB)\s?[1-9][\d]{1,3}\s?[A-Z]*(E|N|Q|U|Y|Z)$/g
  const regJogja = /(AB)\s?[1-9][\d]{1,3}\s?[A-Z]*(A|F|H|I|S)$/g
  const regSultan = /(AB)\s?1$/g

  const isBantul = checkWithRegex(str, regBantul)
  const isKulonProgo = checkWithRegex(str, regKulonProgo)
  const isGunKid = checkWithRegex(str, regGunKid)
  const isSleman = checkWithRegex(str, regSleman)
  const isJogja = checkWithRegex(str, regJogja)
  const isSultan = checkWithRegex(str, regSultan)

  if (isBantul) {
    return "KAB. BANTUL"
  } else if (isKulonProgo) {
    return "KAB. KULON PROGO"
  } else if (isGunKid) {
    return "KAB. GUNUNG KIDUL"
  } else if (isSleman) {
    return "KAB. SLEMAN"
  } else if (isJogja) {
    return "KOTA YOGYAKARTA"
  } else if (isSultan) {
    return "Eh, ada sultan.."
  } else {
    return "Bukan plat nomor Daerah Istimewa Yogyakarta"
  }

}

function checkWithRegex (str, regex) {
  return str.match(regex) !== null ? true : false
}

function renderPlat (e) {
  const val = document.getElementById("input-plat").value.trim().toUpperCase()
  if (val !== "") {
    document.getElementById("status").innerText = checkNumber(val)
  } else {
    document.getElementById("status").innerText = "Masukkan plat nomor"
  }
}