import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetName  } from './name.action';
import { UserName } from './name.model';

@State({
    name: "name",
    defaults: {
        name: 'vacio'
    }
})
@Injectable({
    providedIn: 'root'
})
export class StateName{
    
    @Selector()
    static getName(state: UserName){
        return state.name;
    }

    @Action(SetName)
    setUser({ patchState}: StateContext<UserName>, { payload }: SetName){
        patchState({
            name: payload
        })
    }

}