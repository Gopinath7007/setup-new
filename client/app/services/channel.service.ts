import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Channel } from '../shared/models/channel.model';

@Injectable()
export class ChannelService {

  constructor(private http: HttpClient) { }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>('/api/channels');
  }

  countChannels(): Observable<number> {
    return this.http.get<number>('/api/channels/count');
  }

  addChannel(channel: Channel): Observable<Channel> {
  alert()
    return this.http.post<Channel>('/api/channel', channel);
  }

  getChannel(channel: Channel): Observable<Channel> {
    return this.http.get<Channel>(`/api/channel/${channel._id}`);
  }

  editChannel(channel: Channel): Observable<any> {
    return this.http.put(`/api/channel/${channel._id}`, channel, { responseType: 'text' });
  }

  deleteChannel(channel: Channel): Observable<any> {
    return this.http.delete(`/api/channel/${channel._id}`, { responseType: 'text' });
  }

}
