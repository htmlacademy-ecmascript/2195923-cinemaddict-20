import ApiService from '../framework/api-service';
import {Method} from '../const';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  // async updatePoint(point) {
  //   const response = await this._load({
  //     url: `points/${point.id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(this.#adaptToServer(point)),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });
  //
  //   const parsedResponse = await ApiService.parseResponse(response);
  //
  //   return parsedResponse;
  // }

  // async addPoint(point) {
  //   const response = await this._load({
  //     url: 'points',
  //     method: Method.POST,
  //     body: JSON.stringify(this.#adaptToServer(point)),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });
  //
  //   const parsedResponse = await ApiService.parseResponse(response);
  //
  //   return parsedResponse;
  // }

  // async deletePoint(point) {
  //   const response = await this._load({
  //     url: `points/${point.id}`,
  //     method: Method.DELETE,
  //   });
  //
  //   return response;
  // }

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

  adaptToClient(film) {
    const filmInfo = film['film_info'];
    const filmInfoRelease = filmInfo['release'];
    const userDetails = film['user_details'];

    const adaptedFilmInfoRelease = {...filmInfoRelease,
      releaseCountry: filmInfoRelease['release_country'],
    };

    delete adaptedFilmInfoRelease['release_country'];

    const adaptedFilmInfo = {...filmInfo,
      alternativeTitle: filmInfo['alternative_title'],
      totalRating: filmInfo['total_rating'],
      ageRating: filmInfo['age_rating'],
      release: adaptedFilmInfoRelease,
    };

    delete adaptedFilmInfo['alternative_title'];
    delete adaptedFilmInfo['total_rating'];
    delete adaptedFilmInfo['age_rating'];

    const adaptedUserDetails = {...userDetails,
      alreadyWatched: userDetails['already_watched'],
      watchingDate: userDetails['watching_date'],
    };

    delete adaptedUserDetails['already_watched'];
    delete adaptedUserDetails['watching_date'];

    const adaptedFilm = {...film,
      filmInfo: adaptedFilmInfo,
      userDetails: adaptedUserDetails,
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  }
}
