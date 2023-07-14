import ApiService from '../framework/api-service';
import {Method} from '../const';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async updateUserDetails(film) {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

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

  #adaptToServer(film) {
    return {
      'id': film.id,
      'film_info': {
        'title': film.filmInfo.title,
        'alternative_title': film.filmInfo.alternativeTitle,
        'description': film.filmInfo.description,
        'total_rating': film.filmInfo.totalRating,
        'poster': film.filmInfo.poster,
        'age_rating': film.filmInfo.ageRating,
        'director': film.filmInfo.director,
        'writers': film.filmInfo.writers,
        'actors': film.filmInfo.actors,
        'genre': film.filmInfo.genre,
        'duration': film.filmInfo.duration,
        'release': {
          'date': film.filmInfo.release.date,
          'release_country': film.filmInfo.release.releaseCountry,
        }
      },
      'user_details': {
        'watchlist': film.userDetails.watchlist,
        'already_watched': film.userDetails.watched,
        'watching_date': film.userDetails.watchingDate,
        'favorite': film.userDetails.favorite,
      },
      'comments': film.comments,
    };
  }

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
      watched: userDetails['already_watched'],
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
