import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import AutoComplete from './AutoComplete';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            query: ''
        };
    }

    filter(data, query) {
        if (query === '') {
            return [];
        }
        let invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;

        let replaced_query = query.replace(invalid, "");
        const regex = new RegExp(`${replaced_query.trim()}`, 'i');
        return data.filter(item => {
            let repl = item.label.replace(invalid, "");
            return repl.search(regex) >= 0
        }).slice(0, 5);
    }

    onChange(text) {
        this.setState({query: text});
        if (this.props.value) {
            this.props.onChange(null);
        }
    }

    render() {
        const props = this.props;
        const {query} = this.state;
        const data = props.value ? [] : this.filter(props.values, query);

        return (
            <AutoComplete style={{paddingBottom: 6, paddingTop: 6,}}
                //onChangeText={this.props.onChange}
                          onFocus={() => props.onFocus(true)}
                          onBlur={() => props.onFocus(false)}
                          autoCapitalize="none"
                          autoCorrect={false}
                          containerStyle={styles.autocompleteContainer}
                          data={data.length < 1 ? [] : data}
                          defaultValue={query}
                          onChangeText={text => this.onChange(text)}
                          placeholder={props.placeholder}
                          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => +rowID !== data.length - 1 ? (
                              <View style={{
                                  borderTopColor: '#ddd',
                                  borderTopWidth: StyleSheet.hairlineWidth,
                              }}>
                              </View>
                          ) : null}
                          renderItem={({label, value}) => (
                              <TouchableOpacity style={{
                                  zIndex: 9999,
                                  paddingBottom: 8,
                                  paddingTop: 8,
                              }} onPress={() => {
                                  props.onChange(value);
                                  this.setState({query: label, data: []})
                              }
                              }>
                                  <View style={{flexDirection: 'row', width: '100%'}}>
                                      <View style={{width: '70%'}}>
                                          <Text style={styles.itemText}>
                                              {label}
                                          </Text>
                                      </View>
                                      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                          <Text style={{fontSize: 15, color: '#ccc'}}>→</Text>
                                      </View>
                                  </View>
                              </TouchableOpacity>
                          )}
            />
        )
    }

}
const styles = StyleSheet.create({
    autocompleteContainer: {},
    itemText: {
        zIndex: 9999,
        fontSize: 14,
        color: '#555'
    },

});