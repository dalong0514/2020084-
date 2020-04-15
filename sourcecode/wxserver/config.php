<?php
return array(
    'WXAPPID' => 'wx45107321ad295469',
    'WXAPPSECRET' => 'bd0ca7777052dec230a1ebc9b125797c',
    'LOGINURL' =>  "https://api.weixin.qq.com/sns/jscode2session?".
                    "appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
    'TOKENURL' => "https://api.weixin.qq.com/cgi-bin/token?".
                    "grant_type=client_credential&appid=%s&secret=%s",
    'TPLMSGURL' => "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?".
                    "access_token=%s"
);
?>