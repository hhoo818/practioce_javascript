javascript: (function () {
  let selectBox = document.querySelector('select[name="TimecardCause"]');

  // リモートワークのオプションを選択
  selectBox.value = "Cause_2";

  let resisterButton = document.querySelector(".btn.btn-big.btn-primary");
  // 登録をクリック
  if (resisterButton) {
    resisterButton.click();
  }
})();
