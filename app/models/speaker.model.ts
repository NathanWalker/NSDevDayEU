export class Speaker {
  id: number;
  name: string;
  bio?: string;
  image?: string;
  twitter?: string;
  github?: string;
  website?: string;

  constructor(options: any) {
    this.id = options._id;
    this.name = options.name;
    this.bio = options.bio;
    this.image = options.image;
    this.twitter = options.twitter;
    this.github = options.github;
    this.website = options.website;
  }
}
