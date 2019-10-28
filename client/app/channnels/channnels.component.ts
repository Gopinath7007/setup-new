
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../services/channel.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Channel } from '../shared/models/channel.model';

@Component({
  selector: 'app-channel',
  templateUrl: './channnels.component.html',
  styleUrls: ['./channnels.component.scss']
})

export class ChannnelsComponent implements OnInit {

  channel = new Channel();
  channels: Channel[] = [];
  isLoading = true;
  isEditing = false;

  addChannelForm: FormGroup;
  name = new FormControl('', Validators.required);
  channelImage = new FormControl('', Validators.required);
  language = new FormControl('', Validators.required);
  url = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);

  constructor(
    private channelService: ChannelService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.getChannels();
    this.addChannelForm = this.formBuilder.group({
      name: this.name,
      
      channelImage: this.channelImage,
      url: this.url,
      category: this.category,
      language: this.language
    });
  }

  getChannels() {
    this.channelService.getChannels().subscribe(
      data => { 
        this.channels = data;
        console.log(data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addChannel() {
    this.channelService.addChannel(this.addChannelForm.value).subscribe(
      res => {
        this.channels.push(res);
        this.addChannelForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(channel: Channel) {
    this.isEditing = true;
    this.channel = channel;
  }

  cancelEditing() {
    this.isEditing = false;
    this.channel = new Channel();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the channel to reset the editing
    this.getChannels();
  }

  editChannel(channel: Channel) {
    this.channelService.editChannel(channel).subscribe(
      () => {
        this.isEditing = false;
        this.channel = channel;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteChannel(channel: Channel) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.channelService.deleteChannel(channel).subscribe(
        () => {
          const pos = this.channels.map(elem => elem._id).indexOf(channel._id);
          this.channels.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}

