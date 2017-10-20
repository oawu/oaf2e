<!DOCTYPE html>
<html lang="tw">
  <head>
    <meta http-equiv="Content-Language" content="zh-tw" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />

    <title></title>

    <link href="css/icon.css" rel="stylesheet" type="text/css" />
    <link href="css/public.css" rel="stylesheet" type="text/css" />
    <link href="css/a.css" rel="stylesheet" type="text/css" />

    <script src="js/jquery_v1.10.2/jquery-1.10.2.min.js" language="javascript" type="text/javascript" ></script>
    <script src="js/public.js" language="javascript" type="text/javascript" ></script>

  </head>
  <body lang="zh-tw">
    
    <header id='header'>
      <h1>標題標題標題標題標題標題標題</h1>
      <p>wrapwrapwrapwrapwrapwrapwrapwrapwrap</p>
    </header>

    <div id='menu'>
      <input type='checkbox' id='menu_ckb' class='_ckbh' >
      <label class='icon-13' for='menu_ckb'></label>

      <div class='wrap'>
        <a href="index.html">選項 1</a>
        <a href="content.html">選項 2</a>
        <a href="create.html" class='a'>選項 3</a>
      </div>
    </div>

    <main id='main'>
      <nav id='nav'>
        <a href="#">網站</a>
        <a href="#">選項 1</a>
        <span>新增文章</span>
      </nav>

      <form class='create'>
<!--         <span class='r'>錯誤！</span>
        <span class='b'>提示！</span>
        <span class='g'>成功！</span> -->
        <div class='row'>
          <b class='need min' data-tip='是否已經完成？'>狀態</b>
          <label class='switch'>
            <input type='checkbox' name='status' value='' />
            <span></span>
          </label>
        </div>

        <label>
          <b class='need' data-tip='就是標題而已'>標題</b>
          <input>
        </label>
        
        <label>
          <b class='need'>內容</b>
          <textarea class='autosize'></textarea>
        </label>

        <label>
          <b class='need'>類別</b>
          <select>
            <option>iOS</option>
            <option>Android</option>
            <option>Web</option>
            <option>Design</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <b>解決方式</b>
          <textarea class='autosize'></textarea>
        </label>

        <label>
          <b>Designer 考量 / 建議</b>
          <textarea class='autosize'></textarea>
        </label>

        <label>
          <b>RD 建議</b>
          <textarea class='autosize'></textarea>
        </label>

        <label>
          <b>Backend 建議</b>
          <textarea class='autosize'></textarea>
        </label>

        <div class='row muti' data-vals='<?php echo json_encode (array ());?>' data-cnt='<?php echo count (array (array ('el' => 'input', 'type' => 'text', 'name' => 'jobs', 'key' => 'name', 'placeholder' => '公司，ex: 獸吼數位科技'),));?>' data-attrs='<?php echo json_encode (array (array ('el' => 'input', 'type' => 'text', 'name' => 'jobs', 'key' => 'name', 'placeholder' => '公司，ex: 獸吼數位科技'),));?>'>
          <b class='need'>可能造成的問題</b>
          <span><a></a></span>
        </div>


        <div class='row muti' data-vals='<?php echo json_encode (array ());?>' data-cnt='<?php echo count (array (array ('el' => 'input', 'type' => 'text', 'name' => 'jobs', 'key' => 'name', 'placeholder' => '公司，ex: 獸吼數位科技'),));?>' data-attrs='<?php echo json_encode (array (array ('el' => 'input', 'type' => 'text', 'name' => 'jobs', 'key' => 'name', 'placeholder' => '公司，ex: 獸吼數位科技'),));?>'>
          <b class='need'>數據相關輔助資料</b>
          <span><a></a></span>
        </div>

        <div>
          <span>點擊確定送出後，就代表您已閱讀並同意遵守<a href='' target='_blank'>使用條款</a>。</span>
          
          <div>
            <button type='submit'>確定新增</button>
            <button type='reset'>重新填寫</button>
          </div>
        </div>

      </form>
    </main>
    <footer id='footer'>
      <div>版權所有 ©2017 kerker.tw, All Rights Reserved.</div>
      <div>本網站內會員言論僅代表個人觀點，不代表本站同意其說法，本站不承擔由該言論引起的法律責任。</div>
    </footer>
    
    <div id='ntf'></div>
    <div id='loading' class='_box'>請稍候..</div><label class='_bc'></label>

  </body>
</html>
