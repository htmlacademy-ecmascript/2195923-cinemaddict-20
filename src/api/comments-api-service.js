import ApiService from '../framework/api-service';
import {Method} from '../const';

export default class CommentsApiService extends ApiService {

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(ApiService.parseResponse);
  }

  async addComment({filmId, comment}) {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  async deleteComment(commentId) {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    // const parsedResponse = await ApiService.parseResponse(response);

    return response;
  }

  // #adaptToServer(point) {
  //   const adaptedPoint = {...point,
  //     'base_price': point.basePrice,
  //     'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
  //     'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
  //     'is_favorite': point.isFavorite,
  //   };
  //
  //   delete adaptedPoint.basePrice;
  //   delete adaptedPoint.dateFrom;
  //   delete adaptedPoint.dateTo;
  //   delete adaptedPoint.isFavorite;
  //
  //   return adaptedPoint;
  // }

  adaptToClient(comment) {
    return comment;
  }
}
