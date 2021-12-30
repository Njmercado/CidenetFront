import { IEmployee } from "../interfaces/employee.interface"

export class Paginator {
  page: Number
  documents: Number

  constructor(page: number = 0, documents: number = 10) {
    this.page = page;
    this.documents = documents;
  }
}

export class RestEmployee {
  paginator?: Paginator
  filters?: IEmployee | any

  constructor(
    filters?: IEmployee,
    paginator?: Paginator
  ) {
    this.paginator = paginator || new Paginator();
    this.filters = filters || {};
  }

  getAllDataAsJson() {
    return {
      filters: this.getFiltersAsJson(),
      paginator: this.paginator,
    }
  }

  getFiltersAsJson() {

    let jsonObj: any = {}

    if(this.filters.country.toString()) jsonObj["country"] = this.filters.country
    if(this.filters.idType) jsonObj["idType"] = this.filters.idType
    if(this.filters.area) jsonObj["area"] = this.filters.area
    if(this.filters._id) jsonObj["_id"] = this.filters._id || /.*/
    if(this.filters.email) jsonObj["email"] = this.filters.email || /.*/
    if(this.filters.firstname) jsonObj["firstname"] = this.filters.firstname || /.*/
    if(this.filters.surname) jsonObj["surname"] = this.filters.surname || /.*/
    if(this.filters.secondSurname) jsonObj["secondSurname"] = this.filters.secondSurname || /.*/

    return jsonObj;
  }
}
