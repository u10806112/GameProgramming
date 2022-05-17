class Keyframe{
	walk(t,power) {
		var s = ((t - ts) % T) / T;
		if (30*s < 1)s = s*(Math.floor(Math.random()*30)+1);
		else if (20*s < 1)s = s*(Math.floor(Math.random()*20)+1);
		else if (10*s < 1)s = s*(Math.floor(Math.random()*10)+1);
		if ( power > 30.0 )
			keys = this.pace_fast();
		else if(power < 1.0)
			this.walk_stand(t);
		else if(power < 15.0)
			keys = this.pace_slow();
		else
			keys = this.pace_m();
		for (var i = 1; i < keys.length; i++) {
			if (keys[i][0] > s) break;
		}
		var ii = i - 1;
		var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
		let theta1 = keys[ii][1].theta1*(1-a) + keys[ii+1][1].theta1*a;
		let theta2 = keys[ii][1].theta2*(1-a) + keys[ii+1][1].theta2*a;
		intKey = [theta1, theta2]
	}
	stand_walk(t) {
		var s = ((t - ts) % T) / T;
  
		keys = this.s_to_w();

		for (var i = 1; i < keys.length; i++) {
			if (keys[i][0] > s) break;
		}
		var ii = i - 1;
		var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
		let theta1 = keys[ii][1].theta1*(1-a) + keys[ii+1][1].theta1*a;
		let theta2 = keys[ii][1].theta2*(1-a) + keys[ii+1][1].theta2*a;
		intKey = [theta1, theta2]
	}
	walk_stand(t) {
		var s = ((t - ts) % T) / T;  
		keys = this.w_to_s();

		for (var i = 1; i < keys.length; i++) {
			if (keys[i][0] > s) break;
		}
		var ii = i - 1;
		var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
		let theta1 = keys[ii][1].theta1*(1-a) + keys[ii+1][1].theta1*a;
		let theta2 = keys[ii][1].theta2*(1-a) + keys[ii+1][1].theta2*a;
		intKey = [theta1, theta2]
	}
	pace_fast(){
		p1 = {theta1:-0.52,theta2:0.52}
		p1b = {theta1:-0.42,theta2:0.42}
		p2 = {theta1:0.52,theta2:-0.52}
		p2b = {theta1:0.42,theta2:-0.42}
		var key = [[0,p1],[0.4,p2b],[0.5,p2b],[0.5,p2],[0.9,p1b],[1,p1b],[1,p1]];
		return key
	}
	pace_m(){
		p1 = {theta1:0.26,theta2:-0.26}
		p1b = {theta1:0.21,theta2:-0.21}
		p2 = {theta1:-0.26,theta2:0.26}
		p2b = {theta1:-0.21,theta2:0.21}
		var key = [[0,p1],[0.4,p2b],[0.5,p2b],[0.5,p2],[0.9,p1b],[1,p1b],[1,p1]];
		return key
	}
	pace_slow(){
		p1 = {theta1:0.13,theta2:-0.13}
		p1b = {theta1:0.10,theta2:-0.10}
		p2 = {theta1:-0.13,theta2:0.13}
		p2b = {theta1:-0.10,theta2:0.10}
		var key = [[0,p1],[0.4,p2b],[0.5,p2b],[0.5,p2],[0.9,p1b],[1,p1b],[1,p1]];
		return key
	}
	s_to_w(){
		p1 = {theta1:0.0,theta2:0.26}
		p2 = {theta1:0.0,theta2:0.21}
		var key = [[0,p2],[0.5,p2],[1,p1]];
		return key
	}
	w_to_s(){
		p1 = {theta1:0.0,theta2:0.0}
		p2 = {theta1:0.0,theta2:-0.21}
		var key = [[0,p2],[0.5,p2],[1,p1]];
		return key
	}
}