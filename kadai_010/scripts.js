$(function() {
  //animation button
  $('.button-more').on('mouseover', function() {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });
  $('.button-more').on('mouseout', function() {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0
    }, 100);
  });

   // settings for carousel
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  //send input data to STATIC FORMS with Ajax
  $('#submit').on('click', function (event){
    //reject submit data using form-tag
    event.preventDefault();

    //check an error in input data
    let result = inputCheck();

    //get result of error check & message
    let error = result.error;
    let message = result.message;

    //send input data if no error
    if (error == false) {
      //send data with Ajax
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function(result) {
          alert('お問い合わせ内容を送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせ内容を送信できませんでした。')
        }
      })
    } else {
      // show error message
      alert(message);
    }
  });

  // nameなどの要素からフォーカスが外れた瞬間にinputCheck functionを呼び出す
  $('#name').blur(function(){
    inputCheck()
  });
  $('#furigana').blur(function(){
    inputCheck()
  });
  $('#email').blur(function(){
    inputCheck()
  });
  $('#tel').blur(function(){
    inputCheck()
  });
  $('#message').blur(function(){
    inputCheck()
  });
  $('#prefecture').blur(function(){
    inputCheck()
  });
  $('#agree').click(function(){
    inputCheck()
  });

  // お問い合わせフォームの入力チェック
  function inputCheck() {
    // エラーのチェック結果
    let result;

    // エラーメッセージのテキスト
    let message = '';

    // エラーがなければfalse、エラーがあればtrue
    let error = false;

    // お名前のチェック
    if ($('#name').val() == '') {
      //has error
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      //no error
      $('#name').css('background-color', '#fafafa');
    }

    // check furigana input
    if ($('#furigana').val() == '') {
      //has error
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      //no error
      $('#furigana').css('background-color', '#fafafa');
    }

    // check otoiawase input
    if ($('#message').val() == '') {
      //has error
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      //no error
      $('#message').css('background-color', '#fafafa');
    }
    
    // check prefecture selection
    if ($('#prefecture').val() == '') {
      //has error
      $('#prefecture').css('background-color', '#f79999');
      error = true;
      message += '都道府県を入力してください。\n';
    } else {
      //no error
      $('#prefecture').css('background-color', '#fafafa');
    }

    //check email data
      if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
        //has error
        $('#email').css('background-color', '#f79999');
        error = true;
        message += 'メールアドレスが未記入、または「＠」「.」が含まれていません。\n';
      } else {
        // no error
        $('#email').css('background-color' , '#fafafa');
      }
      //check telephone number
      if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) 
      {
        //has error
        $('#tel').css('background-color', '#f79999');
        error = true;
        message += '電話番号に「-」が含まれていません。\n';
      } else {
        // no error
        $('#tel').css('background-color', '#fafafa');
      }

      //check personal information checkbox
      if ($('#agree').prop('checked') == false) {
        error = true;
        message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
      }
     // Toggle submit button with/without error
      if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
      } 
      else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
      }

      //show input error message
      result = {
        error: error,
        message: message
      }

      //return the result of error check
      return result;
    }
});