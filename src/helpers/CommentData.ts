export function generateNextCursor (respData: any, limit: number): string | null {
    const comments = respData?.comments;
    // Check if we have enough comments for pagination
    if (comments && comments.length === limit) {
      const lastComment = comments[comments.length - 1];
      return new Date(lastComment.created_at).toISOString(); 
    }
  
    return null;
  };


  export function getTotalComments (respData: any) {
    return respData.comments.length
  }