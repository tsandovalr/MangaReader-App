import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetAvatar } from './avatar.action';
import { UserAvatar } from './avatar.model';

@State({
    name: "avatar",
    defaults: {
        avatar: 'vacio' 
    }
})
@Injectable({
    providedIn: 'root'
})
export class StateAvatar{
    @Selector()
    static getAvatar(state: UserAvatar){
        return state.avatar;
    }

   @Action(SetAvatar)
    setAvatar({ patchState}: StateContext<UserAvatar>, { payload }: SetAvatar){
        patchState({
            avatar: payload 
        })
    }

}