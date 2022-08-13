class ApiFeatures {
   constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
   }

   search() {
      const keyword = this.queryString.keyword
         ? {
              name: {
                 $regex: this.queryString.keyword,
                 $options: "i", //for case insensitive
              },
           }
         : {};

      this.query = this.query.find({ ...keyword });

      return this;
   }

   filter() {
      const queryCopy = { ...this.queryString };

      //remove some fields from query
      const removeFilds = ["keyword", "page", "limit"];

      removeFilds.forEach((key) => delete queryCopy[key]);

      //filter for price and rating
      let queryString = JSON.stringify(queryCopy);

      queryString = queryString.replace(
         /\b(gt|gte|lt|lte)\b/g,
         (key) => `$${key}`
      );

      this.query = this.query.find(JSON.parse(queryString));

      return this;
   }

   pagination(resultPerPage) {
      const currentPage = Number(this.queryString.page) || 1;

      const skip = resultPerPage * (currentPage - 1);

      this.query = this.query.limit(resultPerPage).skip(skip);

      return this;
   }
}
module.exports = ApiFeatures;
