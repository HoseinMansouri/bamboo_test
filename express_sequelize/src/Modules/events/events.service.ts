import Event from './entities/event.entity';
import Workshop from './entities/workshop.entity';
const { Op } = require('sequelize')
export class EventsService {

  async getWarmupEvents() {
    return await Event.findAll();
  }
  
  async getEventsWithWorkshops() {
    return await Event.findAll({
      include: [{model: Workshop,required: true,order:[["id","asc"]]}]
    });           
  }
  
  async getFutureEventWithWorkshops() {       
      return await Event.findAll({
        include: [{
          model: Workshop,
          required: true,
          where:{
            start: {
              [Op.gt]: new Date()
            }
          },
          order:[["id","asc"]]
        }]
      });  
  }
}
