import confg from "../confg/confg"
import {Client ,Databases,Storage,Query ,ID} from "appwrite"
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor(){
    this.client 
    . setEndpoint(confg.appwriteUrl)
    . setProject(confg.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
  }
  async createPost(title,slug,content,featuredImage,status , userId){
    try {
      return await this.databases.createDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      ) 
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
  async updatePost(slug ,{title,content,featuredImage,status }){
    try {
      return await this.databases.updateDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
      
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }
  async deletePost(slug){
    try {
       await this.databases.deleteDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }
  async getPost(slug){
    try {
      return await this.databases.getDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug
      )

    } catch (error) {
      console.log(error);

    }
  }
  async getPosts(queries=[Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        queries,
      )
    } catch (error) {
      console.log(error);
      return false
    }
  }


  // file upload services

  async uploadFile(file){
    try {
      
      return await this.bucket.createFile(
        confg.appwriteBucketId,
        ID.unique(),
        file
      )

    } catch (error) {
      console.log(error);
      return false
    }
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        confg.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      confg.appwriteBucketId,
      fileId
    )
  }
}

const service =new Service()
export default service;
