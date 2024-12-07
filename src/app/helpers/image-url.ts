import environment from "environments/environment";

export function getUrlImage(url: string): string {
  return url ? `${environment.storageUrl}/${url}` : ''
}
