export class Venue {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public zipcode: string,
    public city: string,
    public country: string,
    public image: string,
    public latitude: number,
    public longitude: number
  ) {}
}
