import '../../../shared/utils/test/setup';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe, it } from 'mocha';

import { HTTPTransport } from './HTTPtransport';

describe('HTTPTransport', () => {
  let server: sinon.SinonFakeServer;
  let transport: HTTPTransport;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    transport = new HTTPTransport();
  });

  afterEach(() => {
    server.restore();
  });

  it('должен отправлять кастомные заголовки', async () => {
    transport.get('https://api.com', {
      headers: { 'X-Custom': 'secret-value' },
    });
    const request = server.requests[0];
    expect(request.requestHeaders['X-Custom']).to.equal('secret-value');
  });

  it('проверка query параметров в URL для GET запроса', async () => {
    transport.get('https://api.com', {
      data: { a: 1, b: 'test' },
    });

    const request = server.requests[0];
    expect(request.url).to.equal('https://api.com?a=1&b=test');
  });

  it('должен корректно отправлять данные в формате FormData', async () => {
    const formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');

    transport.post('https://api.com/upload', { data: formData });
    const request = server.requests[0];
    expect(request.method).to.equal('POST');
    expect(request.requestBody).to.equal(formData);
  });

  it('метод PUT должен отправлять данные и корректный заголовок', async () => {
    const data = { id: 1 };
    transport.put('/user', { data });
    const request = server.requests[0];
    expect(request.method).to.equal('PUT');
    expect(request.requestBody).to.equal(JSON.stringify(data));
    expect(request.requestHeaders['Content-Type']).to.include('application/json');
  });

  it('метод DELETE должен корректно работать', async () => {
    transport.delete('/user/1');
    const request = server.requests[0];
    expect(request.method).to.equal('DELETE');
  });

  it('метод PATCH должен отправлять данные', async () => {
    const data = { name: 'New Name' };
    transport.request('/user', { data, method: 'PATCH' });
    const request = server.requests[0];
    expect(request.method).to.equal('PATCH');
    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it('должен устанавливать флаг withCredentials по умолчанию в true', async () => {
    transport.get('/test');
    const request = server.requests[0];
    expect(request.withCredentials).to.be.true;
  });
});
