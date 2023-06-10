import querystring from 'querystring';
import http from 'http';

class XunhupayService {
  private _url = 'https://api.xunhupay.com/payment/do.html';

  public pay() {
    const requestParams = this._createRequestParams();

  }

  private _createRequestParams() {
    const requestParams = {
      appid: '201609260059',
      version: '1.1',
      trade_order_id: '201609260059',
      total_fee: '1',
      title: 'test',
      return_url: 'http://www.baidu.com',
      notify_url: 'http://www.baidu.com',
      time: '1474888936',
      nonce_str: '1474888936',
      hash: '1474888936',
    };
    return requestParams;
  }
}
