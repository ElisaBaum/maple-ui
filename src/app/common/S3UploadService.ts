import {Injectable} from 'react.di';

@Injectable
export class S3UploadService {

  uploadFile(file: File, policy, onProgress: (event: ProgressEvent, file: File) => any) {
    return new Promise((resolve, reject) => {
      const formData = this.createFormData(file, policy);
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', event => onProgress(event, file), false);
      xhr.addEventListener('load', (e) => {
        if (e && e.target && /^(5|4)/.test(e.target['status'])) {
          reject(new Error(e.target['statusText']));
        } else {
          resolve();
        }
      }, false);
      xhr.addEventListener('error', (err) => reject(err), false);
      xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')), false);

      // need to be last line before send
      xhr.open('POST', policy.url, true);
      xhr.send(formData);
    });
  }

  private createFormData(file: File, policy) {
    const formData = new FormData();

    formData.append('key', policy.key);
    formData.append('acl', policy.acl);
    formData.append('Content-Type', file.type);
    formData.append('policy', policy.policy);
    formData.append('success_action_status', policy.successStatus);

    formData.append('x-amz-algorithm', policy.algorithm);
    formData.append('x-amz-credential', policy.credential);
    formData.append('x-amz-date', policy.date);
    formData.append('x-amz-expires', policy.expires);
    formData.append('x-amz-signature', policy.signature);

    formData.append('file', file);

    return formData;
  }

}
