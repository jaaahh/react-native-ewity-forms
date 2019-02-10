import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import AutoComplete from './AutoComplete';

import InputWrapper from './InputWrapper';
import _ from 'lodash';

const defaultTransformer = (data) => data.map(o => ({key: o.key, text: o.value}));

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            data: [],
            query: ''
        };

        this.fetchData = _.debounce(this.fetchFromApi, 1000);

    }

    componentDidMount() {
        this.setState({
            query: this.props.value || "",
        })
    }

    fetchFromApi() {
        let api = this.props.api;
        let apiArgs = this.props.apiArgs;

        if (!api) {
            return;
        }

        if (typeof api === 'string') {
            alert('string not implemented');

        } else {
            // if api args passed and args is empty don't render
            if (apiArgs && apiArgs.filter(o => !!o).length === 0) {
                return;
            }

            let query = this.state.query;
            if (query === '') {
                return
            }

            this.setState({loading: true});
            api.call(null, this.props.category, query)
                .then(data => {

                    let transformedData = this.props.transformer ? this.props.transformer(data) : defaultTransformer(data.data);
                    this.setState({
                        data: transformedData,
                        loading: false
                    });
                })
                .catch(e => {
                    this.setState({
                        e,
                        loading: false,
                    })
                });
        }
    }

    search(query) {
        if (query === '') {
            return [];
        }
        const {data} = this.state;
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;

        let replaced_query = query.replace(invalid, "");
        const regex = new RegExp(`${replaced_query.trim()}`, 'i');
        return data.filter(item => {
            var repl = item.text.replace(invalid, "");

            return repl.search(regex) >= 0
        }).slice(0, 5);
    }

    onChange(text) {
        this.setState({query: text}, this.fetchData);
    }


    render() {
        const {query} = this.state;
        const data = this.search(query);
        return (
            <InputWrapper {...this.props} label={this.props.label} error={this.props.error} focus={this.state.focus}>
                <AutoComplete style={{paddingBottom: 6, paddingTop: 6,}}
                    //onChangeText={this.props.onChange}
                              onFocus={() => this.setState({focus: true})}
                              onBlur={() => this.setState({focus: false})}
                              autoCapitalize="none"
                              autoCorrect={false}
                              containerStyle={styles.autocompleteContainer}
                              data={data.length < 1 ? [] : data}
                              defaultValue={query}
                              onChangeText={text => this.onChange(text)}
                              placeholder={this.props.placeholder}
                              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => +rowID !== data.length - 1 ? (
                                  <View style={{
                                      borderTopColor: '#ddd',
                                      borderTopWidth: StyleSheet.hairlineWidth,
                                  }}>
                                  </View>
                              ) : null}
                              renderItem={({text, key}) => (
                                  <TouchableOpacity style={{
                                      zIndex: 9999,
                                      paddingBottom: 8,
                                      paddingTop: 8,
                                  }} onPress={() => {
                                      this.props.onChange(key);
                                      this.setState({query: text, data: []})
                                  }
                                  }>
                                      <View style={{flexDirection: 'row', width: '100%'}}>
                                          <View style={{width: '70%'}}>
                                              <Text style={styles.itemText}>
                                                  {_.startCase(_.camelCase(text))}
                                              </Text>
                                          </View>
                                          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                              <Text style={{fontSize: 15, color: '#ccc'}}>→</Text>
                                          </View>
                                      </View>
                                  </TouchableOpacity>
                              )}
                />
            </InputWrapper>
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