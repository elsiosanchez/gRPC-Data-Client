/*************************************************************************************
 * Product: ADempiere gRPC Dictionary Client                       		               *
 * Copyright (C) 2012-2018 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Yamel Senih ysenih@erpya.com				  		                         *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                     *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.            *
 ************************************************************************************/
class Data {
  //  No authentication rerquired
  constructor(clientVersion, host, language) {
    this.clientVersion = clientVersion;
    this.host = host;
    this.language = language;
  }

  /**
  * Request a PO data from serverf
  */
  requestPO(uuid) {
    //  Get PO Data
    return this.getService().requestPO(this.getRequest(uuid));
  }

  /**
  * Load gRPC Connection
  */
  getService() {
    const grpc_promise = require('grpc-promise');
    const {DataServicePromiseClient} = require('./src/grpc/proto/data_grpc_web_pb.js');
    var requestService = new DataServicePromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
  * Get Client Request
  */
  getRequest(uuid) {
    const {ClientRequest, ValueObjectRequest} = require('./src/grpc/proto/data_pb.js');
    let clientRequest = new ClientRequest();
    clientRequest.setUuid(this.clientVersion);
    clientRequest.setLanguage(this.language);
    let request = new ValueObjectRequest();
    request.setUuid(uuid);
    request.setClientrequest(clientRequest);
    //  return
    return request;
  }
}
module.exports = Data;
